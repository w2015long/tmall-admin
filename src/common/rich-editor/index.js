import React,{Component} from 'react';
import Simditor from 'simditor'
import $ from 'jquery'
import 'simditor/styles/simditor.css'


class RichEditor extends Component{
    constructor(props){
        super(props);
		this.toolbar = [
		  'title',
		  'bold',
		  'italic',
		  'underline',
		  'strikethrough',
		  'fontScale',
		  'color',
		  'ol',  
		  'ul', 
		  'blockquote',
		  'code', 
		  'table',
		  'link',
		  'image',
		  'hr', 
		  'indent',
		  'outdent',
		  'alignment',
		]  
		$.ajaxSetup({
			// 要在这里设置 请求携带cookie
            xhrFields: {
                withCredentials: true
            },			
		})      
        
    }
    componentDidMount(){
    	new Simditor({
		  textarea: this.textarea,
		  toolbar:this.toolbar,
		  upload:{
		  	url: this.props.url,
		  	//fileKey要与后台对应-->upload.single('upload')
		  	fileKey: 'upload'
		  }
		});
    }

    render(){
    	return(
    		<div>
    			<textarea ref={textarea=>{this.textarea=textarea}}></textarea>
    		</div>
    	)
    }		
}
export default RichEditor