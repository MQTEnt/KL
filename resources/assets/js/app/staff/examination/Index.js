import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class Index extends React.Component{
	constructor(props){
		super(props);

		this.renderIndexes = this.renderIndexes.bind(this);
	}
	renderIndexes(){
		let indexes = this.props.indexes;
		return (
			<TableBody showRowHover={true} displayRowCheckbox={false}>
	        {
	          indexes.map( (index) => (
	              <TableRow key={index.id} style={{'cursor': 'pointer'}}>
	                  <TableRowColumn>{index.name}</TableRowColumn>
	                  <TableRowColumn>{index.value}</TableRowColumn>
	                  <TableRowColumn>{index.unit}</TableRowColumn>
	                  <TableRowColumn>{index.level}</TableRowColumn>
	              </TableRow>
	            )
	          )
	        }
      		</TableBody>
		);
	}
	render(){
		return (
			<div style={{marginBottom: 20}}>
				<p><b>Kết quả xét nghiệm: </b></p>
				<Table>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow>
							<TableHeaderColumn>Chỉ số</TableHeaderColumn>
							<TableHeaderColumn>Kết quả</TableHeaderColumn>
							<TableHeaderColumn>Đơn vị</TableHeaderColumn>
							<TableHeaderColumn>Mức</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					{this.renderIndexes()}
				</Table>
			</div>
		);
	}
}