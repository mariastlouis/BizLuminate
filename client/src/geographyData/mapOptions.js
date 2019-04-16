export const mapOptions = [
  {
    'name':'Unemployment Rate',
    'property':'unemploymentRate',
    'type':'choropleth',
    'stops':[
     [1.9, '#f0f9e8'],
     [2.9, '#bae4bc'],
     [3.9, '#7bccc4'],
     [8.9, '#2b8cbe']
    ]
  },
  {
    'name':'Median Household Income',
    'property': 'medianhouseholdincome',
    'type': 'choropleth',
    'stops': [
      [29000, '#f0f9e8'],
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
      [0, '#f0f9e8'],
      [1, '#bae4bc'],
      [3, '#7bccc4'],
      [6, '#43a2ca']
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
      "#F9CC1A",
      50,
      "#2b8cbe",
      200,
      "#FE9D2B"
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