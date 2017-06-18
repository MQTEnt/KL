import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Plant = ({id, date, activityList}) => (
  <Card>
    <CardHeader
      title={'Kế hoạch từ '+date[0]+' tới '+date[1]}
      subtitle=''
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>
      <ul style={{margin: 0}}>
        {activityList.map(item => (<li key={item.activity.id}>{item.activity.name}</li>))}
      </ul>
    </CardText>
  </Card>
);

export default Plant;