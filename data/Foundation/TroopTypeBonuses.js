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
            "displayName": "Attack Rating Bonus",
            "type": "number",
            "fieldName": "attackRatingBonus",
            "abbreviation": "AR+",
            "isList": false,
            "defaultValue": ""
        },
        {
            "displayName": "Defense Rating Bonus",
            "type": "number",
            "fieldName": "defenseRatingBonus",
            "abbreviation": "DR+",
            "isList": false,
            "defaultValue": ""
        },
        {
            "displayName": "Morale Rating Bonus",
            "type": "number",
            "fieldName": "moraleRatingBonus",
            "abbreviation": "MR+",
            "isList": false,
            "defaultValue": ""
        },
        {
            "displayName": "Abbreviation",
            "type": "text",
            "fieldName": "abbreviation",
            "abbreviation": "",
            "isList": false,
            "defaultValue": ""
        },
        {
            "displayName": "Health Recovery Bonus",
            "type": "number",
            "fieldName": "healthRecoveryBonus",
            "abbreviation": "HR+",
            "isList": false,
            "defaultValue": ""
        }
    ],
    "values": [
        {
            "displayName": "Ranger Swamp Bonus",
            "identifier": "0",
            "attackRatingBonus": "5",
            "defenseRatingBonus": "10",
            "moraleRatingBonus": "10",
            "abbreviation": "RSB",
            "healthRecoveryBonus": "0"
        }
    ]
}
//END INSERT HERE			
	}
);