import React,{Component} from 'react';
import Simditor from 'simditor'
import $ from 'jquery'
import 'simditor/styles/simditor.css'


class RichEditor extends Component{
    constructor(props){
        super(props);
        this.state = {
        	isBackfill:false
        }
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
			this.setState(()=>({isBackfill:true}),()=>{
				this.props.getRichEditorVal(this.simditor.getValue())
			})
			
		})
    }
    //不能在static getDerivedStateFromProps函数中回填props中数据
    //原因要用到this.simditor 在静态生命周期函数中拿不到this
    //所以在componentDidUpdate函数中回填images数据
    componentDidUpdate(){
    	if(this.props.detail && !this.state.isBackfill){
    		this.simditor.setValue(this.props.detail)
    		this.setState(()=>({isBackfill:true}))
    	}
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