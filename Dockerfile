FROM golang:latest AS build

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o 3lemetry ./cmd/3lemetry

# Final container
FROM debian:latest
WORKDIR /app
COPY --from=build /app/3lemetry .
RUN chmod +x /app/3lemetry

EXPOSE 8080

CMD ["./3lemetry"]
