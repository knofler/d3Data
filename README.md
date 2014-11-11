angular-fullstack-base
======================

This is my customized angular full stack base

Base angular fullstack generated from 

https://github.com/DaftMonk/generator-angular-fullstack

Then couple of modification made to make it usable out of the box,

1. Change made to .yo-rc.json to enable default directory as client/app/ instead of app/components/ , which gives better management for all app related controller and routes and directives in one place.
2. Made some modification to .gitignore so bootstrap files always available after clone.
3. Routes to components directory by default disabled, which disables modal launch from components directory. That enabled, so out of the box modal will be working.
4. ngReact for react component added to angular app through bower, which made ngReact enabled.
5. D3 library injected to index.html 
 <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
6. meSpeak library made available for web audio API
 <script src='http://www.masswerk.at/mespeak/mespeak.js'></script>
7. SimpleWebRTC  Api made available 
 <script src="https://simplewebrtc.com/latest.js"></script> 
8. Other CDN for webRTC made available for easy webrtc connectivity and out of the box access
9. Specific asset folder with certain file type added to dist/files for public access
10. Bootstrap.js enabled by taking bootstrap.js out of bower injection exclusion list.
11. ui.select2 added as bower dependency. ( https://github.com/angular-ui/ui-select2 )
12. ui.sortable added as bower dependency. ( https://github.com/angular-ui/ui-sortable ) 




