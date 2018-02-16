
//This is a prototype for a symbol to show event in a table like format
//This was done for the training program on custom symbol
//This was done also for a specific set of data 
//The next version will loop through the data and create the column dynamically
//Creation : Christian Gagnon 
//Company : Symasol.com
//Date : 2/16/2018


(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);


  var definition = { 
    typeName: "FTable",
    visObjectType: symbolVis,
    datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
    iconUrl: 'Images/FTable.png',
    templateUrl: 'scripts/app/editor/symbols/ext/sym-FTable-template.html',
    resizerMode: 'AutoWidth',
    getDefaultConfig: function(){ 
      return { 
        DataShape: 'Table',
        Height: 500,
        Width: 500 
      } 
    }
  }


	symbolVis.prototype.init = function(scope, elem) {
		this.onDataUpdate = dataUpdate;
	
		function dataUpdate(data) {
       if(!data) return;

        //need to validate the number of item in the list for initial creation
        //need to validate on update if the column already exist (Event start time)
        //Need to validate if the attribute already exist 
        //if already exist (so new event), put it on the same row new column
        //if does not exist, new row and may be new column if new event

        if(!data.Rows[0].Label) {//indicate second pass

        } else {

          scope.names =[
            {
                "Name" : "Attribute",
                "Event1" : data.Rows[2].Label.split('|')[0].substring(0,16), //data.Label.split('|')[0].substring(0,16),
                "Event2" : data.Rows[0].Label.split('|')[0].substring(0,16), //data.Label.split('|')[0].substring(0,16),
                "Event3" : data.Rows[3].Label.split('|')[0].substring(0,16) //data.Label.split('|')[0].substring(0,16),
            },
            {
              "Name" : data.Rows[2].Label.split('|')[1], //data.Label.split('|')[1],
              "Event1" : data.Rows[2].Value,
              "Event2" : "-",
              "Event3" : "-"
            },
            {
              "Name" : data.Rows[0].Label.split('|')[1], //data.Label.split('|')[1],
              "Event1" : "-",
              "Event2" : data.Rows[0].Value,
              "Event3" : "-"
            },
            {
              "Name" : data.Rows[1].Label.split('|')[1], //data.Label.split('|')[1],
              "Event1" : "-",
              "Event2" : data.Rows[1].Value,
              "Event3" : "-"
            },
            {
              "Name" : data.Rows[3].Label.split('|')[1], //data.Label.split('|')[1],
              "Event1" : "-",
              "Event2" : "-",
              "Event3" : data.Rows[3].Value
            },
          ];
        }

			} 

	 };

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
