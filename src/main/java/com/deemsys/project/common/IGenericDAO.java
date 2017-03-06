
package com.deemsys.project.common;
import java.util.List;

import java.util.Date;

/**
 * 
 * @author Deemsys
 *
 */


public interface IGenericDAO<T> {

    /**
     * If the entity already exists, you must use update() instead. There is not
     * yet error handling to warn you if you're attempting to save() an entity
     * that is already in the DB.
     *
     * @param entity
     */
    public void save(T entity);
    
    
    
    /**
     * If the entity exists, it will do update otherwise it will do save instead. 
     *
     * @param entity
     */
    public void merge(T entity);

    public T get(Integer id);

    /**
     * The return object is attached to the DB session and should be used for
     * subsequent object manipulation and update. The input entity is not
     * guaranteed to be attached and so should not be used after the update()
     * call.
     *
     * @param entity
     * @return
     */
    public T update(T entity);

    public void delete(Integer id);

    public List<T> getAll();

    /**
     * Basic one parameter/value SELECT query. Equivalent to: "WHERE
     * paramName=paramValue"
     *
     * @param paramName
     * @param paramValue
     * @return
     */
    public List<T> find(String paramName, String paramValue);

    /**
     *
     * @param paramName
     * @param paramValue
     * @return
     */
    public List<T> find(String paramName, Long paramValue);

    public List<T> find(String paramName, Integer paramValue);

    /**
     * Uses the BasicQuery util class to build slightly more complex queries
     * with multiple filterParams and multiple sortParams.
     *
     * @param query
     * @return
     */
    public List<T> find(BasicQuery query);

    /**
     * Fully customizable search query using HibernateTemplate's
     * findByNamedParam() format.
     *
     * @param queryString
     * @param paramNames
     * @param paramValues
     * @return
     */
    public List<T> find(String queryString, String paramNames[], String paramValues[]);

    /**
     *
     * @param ParamName
     * @param date1
     * @param date2
     * @return
     */
    public List<T> find(String ParamName, Date date1, Date date2);

    /**
     *
     * @param ParamName
     * @param date
     * @return
     */
    public List<T> find(String ParamName, Date date);
    
    
    public boolean disable(Integer id);
    public boolean enable(Integer id);
    public boolean checkName(String name);
    public boolean checkName(Integer id,String name);
    public List<T> getActiveList();
}

