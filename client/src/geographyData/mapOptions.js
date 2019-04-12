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
      [2900, '#f0f9e8'],
      [2900, '#bae4bc'],
      [49539, '#7bccc4'],
      [70077, '#43a2ca'],
      [111154, '#0868ac'],
    ]
  },
  {
    'name':'Electric Car Charging',
    'property': 'altfuel',
    'type': 'point',
    'paint': {
      "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      750,
      "#f28cb1"
      ],
      "circle-radius": [
      "step",
      ["get", "point_count"],
      20,
      100,
      30,
      750,
      40
      ]
      }
  }
]