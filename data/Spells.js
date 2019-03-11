define(
	function() { //INSERT AFTER RETURN		
		return { "fields": [
        {
            "displayName": "Display Name",
            "type": "text",
            "fieldName": "displayName",
            "abbreviation": "",
            "isList": false,
            "defaultValue": ""
        },
        {
            "displayName": "Identifier",
            "type": "number",
            "fieldName": "identifier",
            "abbreviation": "id",
            "isList": false,
            "defaultValue": ""
        },
        {
            "displayName": "Mana Cost",
            "type": "number",
            "fieldName": "manaCost",
            "abbreviation": "mc",
            "isList": false,
            "defaultValue": "0"
        },
        {
            "displayName": "Allowed Terrains",
            "type": "terrainTypes",
            "fieldName": "allowedTerrains",
            "abbreviation": "ATs",
            "isList": true,
            "defaultValue": ""
        },
        {
            "displayName": "Prohibited Terrains",
            "type": "terrainTypes",
            "fieldName": "prohibitedTerrains",
            "abbreviation": "PTs",
            "isList": true,
            "defaultValue": ""
        },
        {
            "displayName": "Troop Bonuses",
            "type": "troopTypeBonuses",
            "fieldName": "troopBonuses",
            "abbreviation": "",
            "isList": true,
            "defaultValue": ""
        }
    ],
    "values": [
        {
            "displayName": "Improve Infantry",
            "identifier": "0",
            "manaCost": "5",
            "allowedTerrains": [
                0
            ],
            "prohibitedTerrains": [],
            "troopBonuses": [
                0
            ]
        }
    ]
}
//END INSERT HERE			
	}
);