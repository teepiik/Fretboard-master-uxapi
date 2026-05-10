param appName string = 'fretboard-master-uxapi'
param location string = resourceGroup().location

resource plan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: '${appName}-plan'
  location: location
  sku: {
    name: 'B1'
    tier: 'Basic'
    size: 'B1'
  }
  kind: 'app'
}

resource web 'Microsoft.Web/sites@2022-03-01' = {
  name: appName
  location: location
  kind: 'app'
  properties: {
    serverFarmId: plan.id
    siteConfig: {
      appSettings: [
        {
          name: 'NODE_VERSION'
          value: '24'
        }
        {
          name: 'PORT'
          value: '4000'
        }
        {
          name: 'WEBSITES_PORT'
          value: '4000'
        }
      ]
    }
  }
}

output webAppName string = web.name
