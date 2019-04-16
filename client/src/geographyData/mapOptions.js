export const mapOptions = [
  {
    'name':'Unemployment Rate',
    'property':'unemploymentRate',
    'type':'choropleth',
    'stops':[
     [1.9, '#edf8fb'],
     [2.9, '#7bccc4'],
     [3.9, '#43a2ca'],
     [8.9, '#0868ac']
    ]
  },
  {
    'name':'Median Household Income',
    'property': 'medianhouseholdincome',
    'type': 'choropleth',
    'stops': [
      [29000, '#edf8fb'],
      [49539, '#7bccc4'],
      [70077, '#43a2ca'],
      [111154, '#0868ac']
    ]
  },
  {
    'name':'County Sales Tax',
    'property': 'countySalesTaxRate',
    'type': 'choropleth',
    'stops': [
      [0, '#edf8fb'],
      [1, '#7bccc4'],
      [3, '#43a2ca'],
      [6, '#0868ac']
    ]
  },
  {
    'name':'Electric Car Charging',
    'property': 'altfuel',
    'type': 'point',
    'stops': [],
    'paint': {
      "circle-color": [
      "step",
      ["get", "point_count"],
      '#7bccc4',
      50,
      '#43a2ca',
      200,
      '#0868ac'
      ],
      "circle-radius": [
      "step",
      ["get", "point_count"],
      20,
      50,
      30,
      200,
      40
      ]
      }
  }
]