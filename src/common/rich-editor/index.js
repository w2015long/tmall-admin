import React,{Component} from 'react';
import Simditor from 'simditor'
import $ from 'jquery'
import 'simditor/styles/simditor.css'


class RichEditor extends Component{
    constructor(props){
        super(props);
		this.toolbar = [
		  'title','bold','italic','underline',
		  'strikethrough','fontScale','color','ol',
		  'ul','blockquote','code','table','link',
		  'image','hr','indent','outdent','alignment',
		]  
		// 在ajax里添加withCredentials的配置，
		// 允许其请求携带cookie信息。通过设置withCredentials=true，
		// 发送Ajax时，Request header中便会带上 Cookie 信息。
		$.ajaxSetup({
			// 要在这里设置 请求携带cookie
            xhrFields: {
                withCredentials: true
            },			
		})      
        
    }
    componentDidMount(){
    	this.simditor = new Simditor({
		  textarea: this.textarea,
		  toolbar:this.toolbar,
		  upload:{
		  	url: this.props.url,
		  	//fileKey要与后台对应-->upload.single('upload')
		  	fileKey: 'upload'
		  }
		});
		this.simditor.on('valuechanged',()=>{
			this.props.getRichEditorVal(this.simditor.getValue()) 
		})
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