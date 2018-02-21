
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
    configOptions : function() {
        return[
            {
                    title: "Format Symbol",
                    mode : "format"
            }
            ];
        },
    getDefaultConfig: function(){ 
      return { 
        DataShape: 'Table',
        Height: 300,
        Width: 800 ,
        BackgroundColor : 'white',
        FontColor : 'blue'
      } 
    }
  }


	symbolVis.prototype.init = function(scope, elem) {
		this.onDataUpdate = dataUpdate;
        scope.names = [];
        scope.names = [];
        scope.names[0] = {
          Name: "Attribute",
          Events: []
        }

		function dataUpdate(data) {
       if(!data) return;


console.log(data);

data.Rows.forEach(row => {
  var attribute = row.Label.split('|')[1];
  var date = row.Label.split('|')[0].substring(0,16); //data.Label.split('|')[0].substring(0,16),
  var value = row.Value;

  var index_of_date = scope.names[0].Events.indexOf(date);
  if(index_of_date === -1) {
    index_of_date = scope.names[0].Events.push(date) - 1;
  }

  var index_of_attr = scope.names.find(x => x.Name == attribute);
  if(index_of_attr == null) {
    scope.names.push({
      Name: attribute,
      Events: []
    });
    scope.names[scope.names.length-1].Events[index_of_date] = value;
  } else {
    index_of_attr.Events[index_of_date] = value;
  }
});

scope.names.forEach(row => {
  row.Events.forEach(evn => {
    if( evn == null)
      evn = "-";
  });
});
console.log(scope.names)

    
			} 

	 };

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
