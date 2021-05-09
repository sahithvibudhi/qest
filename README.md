# Qest
QEST - Bridge the gap between different IoT protocols

## Setup
1. Git clone the repository to your local
```
git clone https://github.com/sahithvibudhi/qest.git
```

2. Change directory to where ever your project is
```
cd qest
```

3. Copy environment variables from .example.env to .env and make changes in the file accordingly
```
cp .example.env .env
```

4. You can start using docker using 
```
docker-compose up --force-recreate --build qest-broker
```

or 

```
npm start
```