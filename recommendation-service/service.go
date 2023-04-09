package recommendation

import (
	"context"
	"time"

	"github.com/patrickmn/go-cache"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type RecommendationServer struct {
	recommendation.UnimplementedRecommendationServiceServer
	db    *mongo.Database
	cache *cache.Cache
}

func NewRecommendationServer(mongoURI string, dbName string, cacheExpiration time.Duration) (*RecommendationServer, error) {
	clientOptions := options.Client().ApplyURI(mongoURI)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return nil, err
	}
	db := client.Database(dbName)

	c := cache.New(cacheExpiration, cacheExpiration/2)
	// Set up the message queue subscription
	messageQueueClient.Subscribe("recommendation_updates", func(update RecommendationUpdate) {
		s.updateCachedRecommendationVersion(update.UserId, update.Version)
	})

	return &RecommendationServer{db: db, cache: c, messageQueueClient: messageQueueClient}, nil

}

func (s *RecommendationServer) GetUserRecommendations(ctx context.Context, req *recommendation.UserRecommendationsRequest) (*recommendation.UserRecommendationsResponse, error) {
	// Check if the user's recommendations are in cache
	cachedRecommendations, found := s.cache.Get(req.UserId)
	if found {
		return cachedRecommendations.(*recommendation.UserRecommendationsResponse), nil
	}

	// Fetch recommendations from MongoDB
	recommendations, err := s.fetchRecommendationsFromMongoDB(req.UserId)
	if err != nil {
		return nil, err
	}

	// Store the recommendations in cache
	s.cache.Set(req.UserId, recommendations, cache.DefaultExpiration)

	return recommendations, nil
}

func (s *RecommendationServer) fetchRecommendationsFromMongoDB(userId string) (*recommendation.UserRecommendationsResponse, error) {
	// Implement fetching recommendations from MongoDB
	// ...
}

func (s *RecommendationServer) updateCachedRecommendationVersion(userId string, version int) {
	cachedData, found := s.cache.Get(userId)
	if found {
		cachedData.(*recommendationData).version = version
	}
}

func (s *RecommendationServer) GetUserRecommendations(ctx context.Context, req *recommendation.UserRecommendationsRequest) (*recommendation.UserRecommendationsResponse, error) {
	cachedData, found := s.cache.Get(req.UserId)
	if found && cachedData.(*recommendationData).version == s.fetchRecommendationVersionFromMongoDB(req.UserId) {
		return cachedData.(*recommendationData).response, nil
	}

	// Fetch recommendations from MongoDB
	recommendations, version, err := s.fetchRecommendationsFromMongoDB(req.UserId)
	if err != nil {
		return nil, err
	}

	// Store the recommendations and version in cache
	s.cache.Set(req.UserId, &recommendationData{response: recommendations, version: version}, cache.DefaultExpiration)

	return recommendations, nil
}

func (s *RecommendationServer) fetchRecommendationVersionFromMongoDB(userId string) (int, error) {
	// Implement fetching the version number from MongoDB
	// ...
}
