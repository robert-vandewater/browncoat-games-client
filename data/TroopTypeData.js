define(
	function() {		
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
            "displayName": "Movement Rating",
            "type": "number",
            "fieldName": "movementRating",
            "abbreviation": "mr",
            "isList": false,
            "defaultValue": "0"
        },
        {
            "displayName": "Gold Cost",
            "type": "number",
            "fieldName": "goldCost",
            "abbreviation": "gc",
            "isList": false,
            "defaultValue": "0"
        },
        {
            "displayName": "Attack Rating",
            "type": "number",
            "fieldName": "attackRating",
            "abbreviation": "AR",
            "isList": false,
            "defaultValue": ""
        },
        {
            "displayName": "Defense Rating",
            "type": "number",
            "fieldName": "defenseRating",
            "abbreviation": "DR",
            "isList": false,
            "defaultValue": ""
        },
        {
            "displayName": "Troop Type",
            "type": "basicTroopTypes",
            "fieldName": "troopType",
            "abbreviation": "TT",
            "isList": false,
            "defaultValue": ""
        }
    ],
    "values": [
        {
            "displayName": "Basic Infantry",
            "identifier": "0",
            "movementRating": "8",
            "goldCost": "15",
            "attackRating": "10",
            "defenseRating": "10",
            "troopType": 1
        },
        {
            "displayName": "Basic Cavalry",
            "identifier": "1",
            "movementRating": "16",
            "goldCost": "45",
            "attackRating": "16",
            "defenseRating": "16",
            "troopType": 0
        },
        {
            "displayName": "Basic Archers",
            "identifier": "2",
            "movementRating": "10",
            "goldCost": "20",
            "attackRating": "20",
            "defenseRating": "5",
            "troopType": 2
        },
        {
            "displayName": "Basic Engineers",
            "identifier": "3",
            "movementRating": "8",
            "goldCost": "20",
            "attackRating": "8",
            "defenseRating": "8",
            "troopType": 3
        }
    ]
}
//END INSERT HERE
	}
);