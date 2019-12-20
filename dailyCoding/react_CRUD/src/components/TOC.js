import React, {Component} from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps, newState){
      if(this.props.data === newProps.data){
        return false;
      }
      return true;
    }
    render() {
      let lists = [];
      let data = this.props.data;
      let i = 0;
      while(i < data.length){
        lists.push(
        <li key={data[i].id}>
          <a 
          href={data[i].id+".html"}
          data-id={data[i].id} // dataset 속성
          onClick={function(e){
            e.preventDefault();
            this.props.onChangePage(e.target.dataset.id);
          }.bind(this)} 
          //function(id, e) { ....}.bind(this, data[i].id) 이런 방식으로도 가능
          >{data[i].title}</a>
        </li>)
        i = i + 1;      
      }
      return (
        <nav>
          <ul>  
            {lists}
          </ul>
        </nav>
      );
    }
}

export default TOC;