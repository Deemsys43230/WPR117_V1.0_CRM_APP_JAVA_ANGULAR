/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.deemsys.project.common;
 

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @author Deemsys
 *
 */


public class BasicQuery {
    public static enum SortDir { ASC, DESC }

	public class FilterParam {
		private String paramName;
		private Object paramValue;
		
		public FilterParam(String paramName, Object paramValue) {
			this.paramName = paramName;
			this.paramValue = paramValue;
		}
		public String getParamName() {
			return paramName;
		}
		public Object getParamValue() {
			return paramValue;
		}
	}
	
	public class SortParam {		
		private String paramName;
		private SortDir sortDir;
		
		public SortParam(String paramName, SortDir sortDir) {
			this.paramName = paramName;
			this.sortDir = sortDir;
		}
		public String getParamName() {
			return paramName;
		}
		public SortDir getSortDir() {
			return sortDir;
		}		
	}

	
	
	private ArrayList<FilterParam> filterList = new ArrayList<FilterParam>();
	private ArrayList<SortParam> sortList = new ArrayList<SortParam>();
	

	public BasicQuery filter(String paramName, Object paramValue) {
		FilterParam param = new FilterParam(paramName, paramValue);
		filterList.add(param);
		return this;
	}
	public BasicQuery sort(String paramName, SortDir sortDir) {
		SortParam sortParam = new SortParam(paramName, sortDir);
		sortList.add(sortParam);
		return this;
	}
	public BasicQuery sort(String paramName) {
		return sort(paramName, SortDir.ASC);
	}
	public List<SortParam> getSortParams() {
		return sortList;
	}
	public List<FilterParam> getFilterParams() {
		return filterList;
	}
}
