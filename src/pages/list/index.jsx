import React, {  useEffect } from "react";
import { Card } from "antd";
import util from '../../utils/util.js'

const List = () => {

  useEffect(() => {
    (async () => {
      let res = await util.httpRequest({
        url: util.WXSETTING_API + '/ping',
        method: 'GET',
      }).catch(err => {
        // message.error('api错误');
      })
      console.log("res=>", res);
    })();
  }, []);

  return (
    <Card title="React 子应用列表页">
     
    </Card>
  );
};

export default List;
