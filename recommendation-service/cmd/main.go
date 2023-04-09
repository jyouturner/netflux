package main

import (
	"log"
	"net"
	"os"
	"time"

	"google.golang.org/grpc"

	"your_project_path/recommendation"
)

func main() {
	// Load configuration values from environment variables or a configuration file
	mongoURI := os.Getenv("MONGO_URI")
	dbName := os.Getenv("DB_NAME")
	cacheExpiration := 10 * time.Minute // adjust the cache expiration time as needed

	// Create an instance of the Recommendation service
	recommendationServer, err := recommendation.NewRecommendationServer(mongoURI, dbName, cacheExpiration)
	if err != nil {
		log.Fatalf("Failed to create recommendation server: %v", err)
	}

	// Start the gRPC server
	listener, err := net.Listen("tcp", ":50051") // choose an appropriate port
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}
	grpcServer := grpc.NewServer()
	recommendation.RegisterRecommendationServiceServer(grpcServer, recommendationServer)

	log.Println("Starting gRPC server...")
	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("Failed to serve gRPC server: %v", err)
	}
}
