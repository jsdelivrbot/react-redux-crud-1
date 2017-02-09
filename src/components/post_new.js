import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost, fetchPost } from '../actions/index';
import { Link } from 'react-router';

class PostNew extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount(){
        if (this.props.route.path && this.props.route.path.indexOf('posts/edit/')>-1 && this.props.params.id)
            this.props.fetchPost(this.props.params.id);
    }

    onSubmit(props){
        this.props.createPost(props)
            .then(()=>{
                //blog post has been created, navigate the user to the index
                //navigate by this.context.router.push
                this.context.router.push('/');
            });
    }

    render(){
        //if (this.props.route.path && this.props.route.path.indexOf('posts/edit/')>-1 && this.props.params.id)
          //  console.log('fetch');

        const { fields: {title,categories,content}, handleSubmit, post } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create a new post</h3>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger':''}`}>
                    <label>Title</label>
                    <input value={post?post.title:''} {...title} type="text" className="form-control" />
                    <div className="text-help">
                        {title.touched?title.error : ''}
                    </div>
                </div>
                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger':''}`}>
                    <label>Categories</label>
                    <input value={post?post.categories:''} {...categories} type="text" className="form-control" />
                    <div className="text-help">
                        {categories.touched?categories.error : ''}
                    </div>
                </div>
                <div className={`form-group ${content.touched && content.invalid ? 'has-danger':''}`}>
                    <label>Content</label>
                    <textarea value={post?post.content:''} {...content} className="form-control" />
                    <div className="text-help">
                        {content.touched?content.error : ''}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values){
    const errors={};
    if (!values.title){
        errors.title = 'enter a username';
    }
    if (!values.categories){
        errors.categories = 'enter a categories';
    }
    if (!values.content){
        errors.content = 'enter a content';
    }
    return errors;
}

function mapStateToProps(state){
    return {
        post: state.posts.post
    };
}

//connect: first argument - mapStateToProps, second is mapDispatchToProps
//reduxForm:1st - config, 2nd - mapStateToProps, 3rd mapDispatchToProps
export default reduxForm({
 form:'PostNew',
 fields: ['title','categories','content'],
    validate
},mapStateToProps,{createPost, fetchPost})(PostNew);