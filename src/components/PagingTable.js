import React, { Component } from 'react';

class PagingTable extends Component {
    render() {
                const { list, onDismiss } = this.props;
                return (                <div>
                        {list.map(item =>
                        <div key={item.objectID}>
                       <span style={{ width: '40%' }}>
<a href={item.url}>{item.title}</a>
</span>
<span style={{ width: '30%' }}> 
{item.author}
</span>
<span style={{ width: '10%' }}>
{item.num_comments}
</span>
<span style={{ width: '10%' }}>
{item.points}
</span>
                        <span>
                        <button  onClick={() => onDismiss(item.objectID)}  type="button"  >   Dismiss  </button>
                        </span>
                        </div>
                        )}
                </div>
                );
    }
    }

export default PagingTable;