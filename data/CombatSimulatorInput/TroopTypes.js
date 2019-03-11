{	
	"troopTypes" : [
		{"id" : 0, "name" : "Basic Infantry", "type" : "Infantry", "attackValue": 10, "defenseValue" : 10, "cost" : 10, "movement" : 10, 
			"bonuses": [
				{"bonusType" : "Terrain", "terrainType" : "desert","bonusEffect" : "ImproveAttackValue","bonusValue" : 15 },
				{"bonusType" : "Level", "levelNumber" : 0,"bonusEffect" : "ImproveAttackValue","bonusValue" : 5 },				
				{"bonusType" : "Weapon", "terrainType" : "desert","bonusEffect" : "ImproveAttackValue","bonusValue" : 15 }
			]
		},
		{"id" : 1, "name" : "Basic Cavalry", "type" : "Cavalry",  "attackValue": 10, "defenseValue" : 10, "cost" : 10, "movement" : 10,
			"bonuses": [
				{"bonusType" : "Terrain", "terrainType" : "plains","bonusEffect" : "ImproveAttackValue","bonusValue" : 15 },
				{"bonusType" : "Level", "levelNumber" : 0,"bonusEffect" : "ImproveAttackValue","bonusValue" : 5 },				
				{"bonusType" : "Weapon", "terrainType" : "desert","bonusEffect" : "ImproveAttackValue","bonusValue" : 15 }
			]
		},
		{"id" : 2, "name" : "Basic Archers", "type" : "Archers", "attackValue": 10, "defenseValue" : 10, "cost" : 10, "movement" : 10,
			"bonuses" : [
				{"bonusType" : "Terrain", "terrainType" : "swamp","bonusEffect" : "ImproveAttackValue","bonusValue" : 15 },
				{"bonusType" : "Level", "levelNumber" : 0,"bonusEffect" : "ImproveAttackValue","bonusValue" : 5 },				
				{"bonusType" : "Weapon", "terrainType" : "desert","bonusEffect" : "ImproveAttackValue" , "bonusValue": 15 }
			]
		}
	]
}
