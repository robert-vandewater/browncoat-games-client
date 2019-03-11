define(
	function() { //Insert after return		
		return {
    "fields": [
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
            "displayName": "Movement Cost",
            "type": "number",
            "fieldName": "movementCost",
            "abbreviation": "MC",
            "isList": false,
            "defaultValue": ""
        },
        {
            "displayName": "ZOC Threshold",
            "type": "number",
            "fieldName": "zocThreshold",
            "abbreviation": "ZOC",
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
        }
		
    ],
    "values": [
        {
            "displayName": "Swamp",
            "identifier": "0",
            "movementCost": "4",
            "zocThreshold": "70",
            "abbreviation": "Sw"
        },
        {
            "displayName": "Grasslands",
            "identifier": "1",
            "movementCost": "2",
            "zocThreshold": "20",
            "abbreviation": "Gl"
        },
        {
            "displayName": "Wetlands",
            "identifier": "2",
            "movementCost": "3",
            "zocThreshold": "30",
            "abbreviation": "Wl"
        },
        {
            "displayName": "Mountains",
            "identifier": "3",
            "movementCost": "6",
            "zocThreshold": "100",
            "abbreviation": "Mt"
        },
        {
            "displayName": "Hills",
            "identifier": "4",
            "movementCost": "4",
            "zocThreshold": "50",
            "abbreviation": "Hi"
        },
        {
            "displayName": "Desert",
            "identifier": "5",
            "movementCost": "3",
            "zocThreshold": "40",
            "abbreviation": "Ds"
        },
        {
            "displayName": "Arid Grasslands",
            "identifier": "6",
            "movementCost": "2",
            "zocThreshold": "20",
            "abbreviation": "AG"
        },
        {
            "displayName": "Tundra",
            "identifier": "7",
            "movementCost": "3",
            "zocThreshold": "40",
            "abbreviation": "Tn"
        },
        {
            "displayName": "Jungle",
            "identifier": "8",
            "movementCost": "6",
            "zocThreshold": "80",
            "abbreviation": "Jn"
        },
        {
            "displayName": "Wooded Hills",
            "identifier": "9",
            "movementCost": "4",
            "zocThreshold": "80",
            "abbreviation": "WH"
        },
        {
            "displayName": "Woodlands",
            "identifier": "10",
            "movementCost": "5",
            "zocThreshold": "90",
            "abbreviation": "Wl"
        }
    ]
}
//END INSERT HERE			
	}
);