define(
	function() { //Insert after return		
		return{ "fields": [
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
            "displayName": "Gold Cost",
            "type": "number",
            "fieldName": "goldCost",
            "abbreviation": "gc",
            "isList": false,
            "defaultValue": "0"
        },
        {
            "displayName": "Iron Cost",
            "type": "number",
            "fieldName": "ironCost",
            "abbreviation": "ic",
            "isList": false,
            "defaultValue": "0"
        },
        {
            "displayName": "Timber Cost",
            "type": "number",
            "fieldName": "timberCost",
            "abbreviation": "tc",
            "isList": false,
            "defaultValue": "0"
        }
    ],
    "values": [
        {
            "displayName": "Standard Sword",
            "identifier": "0",
            "goldCost": "25",
            "ironCost": "15",
            "timberCost": "0"
        }
    ]
}
//END INSERT HERE			
	}
);