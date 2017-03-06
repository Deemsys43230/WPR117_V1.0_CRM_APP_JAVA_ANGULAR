package com.deemsys.project.template;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 
 * @author Deemsys
 *
 */
public class TemplateForm {

	private String blogId;
	private String postedBy;
	private String title;
	private String aboutBlog;
	private String content;
	private String postedOn;
	private String allowComment;
	private String status;
	public String getBlogId() {
		return blogId;
	}
	
	@XmlElement
	public void setBlogId(String blogId) {
		this.blogId = blogId;
	}
	public String getPostedBy() {
		return postedBy;
	}
	
	@XmlElement
	public void setPostedBy(String postedBy) {
		this.postedBy = postedBy;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAboutBlog() {
		return aboutBlog;
	}
	public void setAboutBlog(String aboutBlog) {
		this.aboutBlog = aboutBlog;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getPostedOn() {
		return postedOn;
	}
	public void setPostedOn(String postedOn) {
		this.postedOn = postedOn;
	}
	public String getAllowComment() {
		return allowComment;
	}
	public void setAllowComment(String allowComment) {
		this.allowComment = allowComment;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public TemplateForm(String blogId, String postedBy, String title,
			String aboutBlog, String content, String postedOn,
			String allowComment, String status) {
		super();
		this.blogId = blogId;
		this.postedBy = postedBy;
		this.title = title;
		this.aboutBlog = aboutBlog;
		this.content = content;
		this.postedOn = postedOn;
		this.allowComment = allowComment;
		this.status = status;
	}
	public TemplateForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
