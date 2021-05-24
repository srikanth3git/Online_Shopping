exports.config = {
        framework: 'jasmine', //Type of Framework used 
        seleniumAddress: 'http://localhost:4444/wd/hub',
        //directConnect:true, 
        specs: ['tests/**/*[ts]'], //Name of the Specfile 
      
        onPrepare() { 
              require('ts-node').register({ 
              project: require('path').join(__dirname, './tsconfig.json') // Relative path of tsconfig.json file 
        	});
        },
        jasmineNodeOpts:{
          showColors: true,
          defaultTimeoutInterval: 200000

        }
       
}