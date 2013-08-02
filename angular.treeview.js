/*
	@license Angular Treeview version 0.1
	ⓒ 2013 AHN JAE-HA http://github.com/eu81273/angular.treeview
	License: MIT


	[TREE attribute]
	angular-treeview: the treeview directive
	tree-model : the tree model on $scope.
	node-id : each node's id
	node-label : each node's label
	node-children: each node's children

	<div
		data-angular-treeview="true"
		data-tree-model="roleList"
		data-node-id="roleId"
		data-node-label="roleName"
		data-node-children="children" >
	</div>
*/

(function ( angular ) {
	'use strict';

	angular.module( 'angularTreeview', [] ).directive( 'treeModel', function( $compile ) {
		return {
			restrict: 'A',
			link: function ( scope, element, attrs ) {
				//tree model
				var treeModel = attrs.treeModel;

				//node id
				var nodeId = attrs.nodeId || 'id';

				//node label
				var nodeLabel = attrs.nodeLabel || 'label';

				//children
				var nodeChildren = attrs.nodeChildren || 'children';

				//tree template
				var template = 
					'<ul>' + 
						'<li data-ng-repeat="node in ' + treeModel + '">' + 
							'<i class="collapsed" data-ng-show="node.' + nodeChildren + '.length && node.collapsed" data-ng-click="selectNodeHead(node, $event)"></i>' + 
							'<i class="expanded" data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="selectNodeHead(node, $event)"></i>' + 
							'<i class="normal" data-ng-hide="node.' + nodeChildren + '.length"></i> ' + 
							'<span data-ng-class="node.selected" data-ng-click="selectNodeLabel(node, $event)">{{node.' + nodeLabel + '}}</span>' + 
							'<div data-ng-hide="node.collapsed" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + '></div>' + 
						'</li>' + 
					'</ul>'; 


				//check tree model
				if( treeModel && treeModel.length ) {
					//root node
					if( attrs.angularTreeview ) {
						//$watch tree model
						scope.$watch( treeModel, function( _new, _old ) { 

							//Rendering template.
							element.empty().html( $compile( template )( scope ) );

						}, false ); //if true, re-rendering the treeview every clicks.


						//if node head clicks,
						scope.selectNodeHead = scope.selectNodeHead || function( selectedNode, $event ){
							//stop event bubbling 
							if ( $event.stopPropagation ) $event.stopPropagation();
							if ( $event.preventDefault ) $event.preventDefault();
							$event.cancelBubble = true;
							$event.returnValue = false;

							//Collapse or Expand
							selectedNode.collapsed = !selectedNode.collapsed;
						};

						//if node label clicks,
						scope.selectNodeLabel = scope.selectNodeLabel || function( selectedNode, $event ){
							//stop event bubbling 
							if ( $event.stopPropagation ) $event.stopPropagation();
							if ( $event.preventDefault ) $event.preventDefault();
							$event.cancelBubble = true;
							$event.returnValue = false;

							//remove highlight from previous node
							if( scope.currentNode && scope.currentNode.selected ) {
								scope.currentNode.selected = undefined;
							}

							//set highlight to selected node
							selectedNode.selected = 'selected'

							//set currentNode
							scope.currentNode = selectedNode;
						};
					}

					//chlid nodes
					else {
						//Rendering template created.
						element.html( $compile( template )( scope ) );
					}
				}
			}
		};
	});
})( angular );
