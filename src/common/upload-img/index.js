import React,{Component} from 'react';

import { Upload, Icon, Modal } from 'antd';


class UploadImg extends Component{
    constructor(props){
        super(props);
		this.state = {
			previewVisible: false,
			previewImage: '',
			fileList: [],
		};
		this.handleChange = this.handleChange.bind(this)          
		this.handlePreview = this.handlePreview.bind(this) 
		this.handleCancel = this.handleCancel.bind(this)         
    }		


	handleCancel (){
		this.setState({ previewVisible: false })
	}

	handlePreview(file){
		this.setState({
		  previewImage: file.url || file.thumbUrl,
		  previewVisible: true,
		});
	}
	handleChange({ fileList }){
		// console.log(fileList) 
		this.setState({ fileList },()=>{
			//上传图片把图片地址数组拼接为字符串存储到数据库中
			this.props.getFileList(fileList.map(file=>file.response).join(','))
		})
	}	
	render(){
		const { previewVisible, previewImage, fileList } = this.state;
		const {action,max} = this.props
		const uploadButton = (
	      <div>
	        <Icon type="plus" />
	        <div className="ant-upload-text">上传图片</div>
	      </div>
	    );		
		return (
			<div className="UploadImg">
		        <Upload
		          action={action}
		          listType="picture-card"
		          fileList={fileList}
		          onPreview={this.handlePreview}
		          onChange={this.handleChange}
		          //携带cookie
		          withCredentials={true}
		        >
		          {fileList.length >= max ? null : uploadButton}
		        </Upload>
		        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
		          <img alt="example" style={{ width: '100%' }} src={previewImage} />
		        </Modal>
			</div>
		)
	}
}

export default UploadImg