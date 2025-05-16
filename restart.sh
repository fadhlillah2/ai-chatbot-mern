#!/bin/bash

# Script untuk merestart server MERN AI ChatBot

# Warna untuk output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Bersihkan layar untuk visibilitas lebih baik
clear

echo -e "${BLUE}===== MERN AI ChatBot: Restart Server =====${NC}"

# Menghentikan semua proses node yang berjalan
echo -e "${YELLOW}Menghentikan semua proses node yang berjalan...${NC}"
pkill -f node || echo -e "${YELLOW}Tidak ada proses node yang berjalan${NC}"
sleep 1

# Mode operasi (default: keduanya)
MODE="both"
if [ "$1" == "backend" ]; then
  MODE="backend"
elif [ "$1" == "frontend" ]; then
  MODE="frontend"
fi

# Me-restart backend
if [ "$MODE" == "both" ] || [ "$MODE" == "backend" ]; then
  echo -e "${YELLOW}Memulai ulang server backend...${NC}"
  cd backend
  npm run dev &
  BACKEND_PID=$!
  echo -e "${GREEN}✓ Server backend dimulai dengan PID: $BACKEND_PID${NC}"
  
  # Menunggu beberapa detik untuk memastikan backend sudah berjalan
  sleep 3
  
  if [ "$MODE" == "both" ]; then
    cd ..
  fi
fi

# Me-restart frontend
if [ "$MODE" == "both" ] || [ "$MODE" == "frontend" ]; then
  echo -e "${YELLOW}Memulai ulang server frontend...${NC}"
  if [ "$MODE" == "frontend" ]; then
    cd frontend
  else
    cd frontend
  fi
  npm run dev &
  FRONTEND_PID=$!
  echo -e "${GREEN}✓ Server frontend dimulai dengan PID: $FRONTEND_PID${NC}"
fi

echo -e "\n${BLUE}===== Status Server =====${NC}"
if [ "$MODE" == "both" ] || [ "$MODE" == "backend" ]; then
  echo -e "${GREEN}✓ Backend Server: Berjalan (PID: $BACKEND_PID)${NC}"
fi
if [ "$MODE" == "both" ] || [ "$MODE" == "frontend" ]; then
  echo -e "${GREEN}✓ Frontend Server: Berjalan (PID: $FRONTEND_PID)${NC}"
fi

echo -e "\n${YELLOW}Untuk menghentikan server:${NC}"
if [ "$MODE" == "both" ]; then
  echo -e "  ${YELLOW}kill $BACKEND_PID $FRONTEND_PID${NC}"
elif [ "$MODE" == "backend" ]; then
  echo -e "  ${YELLOW}kill $BACKEND_PID${NC}"
else
  echo -e "  ${YELLOW}kill $FRONTEND_PID${NC}"
fi

echo -e "\n${BLUE}===== Server URLs =====${NC}"
if [ "$MODE" == "both" ] || [ "$MODE" == "backend" ]; then
  echo -e "${GREEN}✓ Backend: http://localhost:5000${NC}"
fi
if [ "$MODE" == "both" ] || [ "$MODE" == "frontend" ]; then
  echo -e "${GREEN}✓ Frontend: http://localhost:5173${NC}"
fi

echo -e "\n${GREEN}Selesai! Server telah dimulai ulang.${NC}"
echo -e "${YELLOW}Tip: Gunakan './restart.sh backend' atau './restart.sh frontend' untuk restart individual.${NC}" 