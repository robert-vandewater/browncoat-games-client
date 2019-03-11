define(
	function() {		
		return { "troopTypes" :
//BEGIN INSERT HERE
			[
				{"id" : 0, "name" : "Basic Infantry", "type" : "Infantry", "attackValue": 10, "defenseValue" :9, "cost" : 8, "movement" :7, 
					"bonuses": [
						{"bonusName" : "Bonus 1","bonusType" : "Terrain", "terrainType" : "desert","bonusEffect" : "ImproveAttackValue","bonusValue" : 15 },
						{"bonusName" : "Bonus 2","bonusType" : "Level", "levelNumber" : 0,"bonusEffect" : "ImproveAttackValue","bonusValue" : 5 },				
						{"bonusName" : "Bonus 3","bonusType" : "Weapon", "terrainType" : "desert","bonusEffect" : "ImproveAttackValue","bonusValue" : 15 }
					]
				},
				{"id" : 1, "name" : "Basic Cavalry", "type" : "Cavalry",  "attackValue": 9, "defenseValue" : 8, "cost" : 7, "movement" : 6,
					"bonuses": [
						{"bonusName" : "Bonus 4","bonusType" : "Terrain", "terrainType" : "plains","bonusEffect" : "ImproveAttackValue","bonusValue" : 15 },
						{"bonusName" : "Bonus 5","bonusType" : "Level", "levelNumber" : 0,"bonusEffect" : "ImproveAttackValue","bonusValue" : 5 },				
						{"bonusName" : "Bonus 6","bonusType" : "Weapon", "terrainType" : "desert","bonusEffect" : "ImproveAttackValue","bonusValue" : 15 }
					]
				},
				{"id" : 2, "name" : "Basic Archers", "type" : "Archers", "attackValue": 8, "defenseValue" :7, "cost" : 6, "movement" :5,
					"bonuses" : [
						{"bonusName" : "Bonus 7","bonusType" : "Terrain", "terrainType" : "swamp","bonusEffect" : "ImproveAttackValue","bonusValue" : 15 },
						{"bonusName" : "Bonus 8","bonusType" : "Level", "levelNumber" : 0,"bonusEffect" : "ImproveAttackValue","bonusValue" : 5 },				
						{"bonusName" : "Bonus 9","bonusType" : "Weapon", "terrainType" : "desert","bonusEffect" : "ImproveAttackValue" , "bonusValue": 15 }
					]
				}
			]
//END INSERT HERE			
		}
	}
);