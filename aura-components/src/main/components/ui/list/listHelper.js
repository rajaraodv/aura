/*
 * Copyright (C) 2012 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
({
 	init: function(component) {
 		this.initDataProvider(component);
 		this.initPagers(component);
	},

	initDataProvider: function(component) {
		var dataProvider = component.getValue("v.dataProvider").unwrap();
		
		if (dataProvider && dataProvider.length && dataProvider.length > 0) {
			dataProvider = dataProvider[0];
			dataProvider.addHandler("onchange", component, "c.handleDataChange");
			dataProvider.get("e.provide").fire();
		}		
	},
	
	initPagers: function(component) {
		var facets = component.getFacets();
		var pagers = [];
		
		// walk each facet looking for instances of ui:pager
		for (var i=0, len=facets.length; i<len; i++) {
			var facet = facets[i];

			facet.each(function(facet) {
				if (facet.getDef().getDescriptor().getQualifiedName() != "markup://aura:unescapedHtml") {
		        	if (facet.isInstanceOf("ui:pager")) {
		        		pagers.push(facet);
		        	} else {
		        		pagers.concat(facet.find({instancesOf:"ui:pager"}));
		        	}
		        }	
			});
        }
		
		// add handlers to each
		for (var j=0, len=pagers.length; j<len; j++) {
			pagers[j].addHandler("onPageChange", component, "c.handlePageChange");
		}
	}
})