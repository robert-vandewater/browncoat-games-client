define(
	function() { //Insert after return	
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
            "displayName": "Artifact Type",
            "type": "basicArtifactTypes",
            "fieldName": "artifactType",
            "abbreviation": "",
            "isList": false,
            "defaultValue": "2"
        }
    ],
    "values": [
        {
            "displayName": "Shield of Deception",
            "identifier": "0",
            "artifactType": 0
        }
    ]
}
//END INSERT HERE			
	}
);