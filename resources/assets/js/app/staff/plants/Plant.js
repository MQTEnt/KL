import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Plant = ({id, date, activityList}) => (
  <Card style={{marginBottom: 10}}>
    <CardHeader
      title={<span><i className="fa fa-thumb-tack"></i> {'Kế hoạch từ '+date[0]+' tới '+date[1]}</span>}
      subtitle=''
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true} style={{padding: 0}}>
      <ul style={{margin: 0, listStyleType: 'none'}}>
        {activityList.map(item => (<li key={item.activity.id}><i className="fa fa-hand-o-right"></i> {item.activity.name}</li>))}
      </ul>
    </CardText>
  </Card>
);

export default Plant;