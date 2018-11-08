package com.spring.service;

import java.math.BigInteger;
import java.util.List;

import com.spring.model.Person;
import com.spring.page.Page;

public interface PersonService {

	List<Person> findAll(Page page, BigInteger parent,String str);
	List<Person> findLeve(int type);
	List<Person> dic();
	List<Person> ins();
	void save(Person welder);
	void catsave(Person welder);
	Person findById(BigInteger fid);
	int getUsernameCount(String welderno);
	void update(Person welder);
	void catupdate(Person welder);
	void delete(BigInteger fid);
	void catdelete(BigInteger fid);
	List<Person> getWelderAll(BigInteger parent);

	/**
	 * 获取所有焊工
	 * @return
	 */
	List<Person> getWelder();
}