package com.spring.service;

import java.math.BigInteger;
import java.util.List;

import com.spring.dto.WeldDto;
import com.spring.model.CatWeld;
import com.spring.model.WeldedJunction;
import com.spring.page.Page;

public interface CatWeldService {
	
	/**
	 * 查询CAT焊工
	 */
	List<CatWeld> getCatWeldAll(Page page, String str);
	
	/**
	 * 查询CAT邮件
	 */
	List<CatWeld> getCatmail(Page page, String str);
	/**
	 * 根据id查询
	 * @param id 焊缝id
	 * @return
	 */
	WeldedJunction getWeldedJunctionById(BigInteger id);
	
	/**
	 * 根据焊工获取焊缝
	 * @param welder
	 * @param dto
	 * @return
	 */
	List<WeldedJunction> getJunctionByWelder(Page page, String welder,WeldDto dto);
	
	/**
	 * 判断焊缝编号是否存在
	 * @param wjno 悍缝编号
	 * @return 受影响的行数
	 */
	int getWeldedjunctionByNo(String wjno);
	
	
	/**
	 * 判断CAT焊工工号是否存在
	 * @param eno
	 * @return
	 */
	int getweldnumCount(String eno);
	
	/**
	 * 新增焊缝
	 * @param wj
	 */
	boolean addCatweld(CatWeld cwm);

	/**
	 * 修改焊缝
	 * @param wj
	 */
	boolean updateCatweld(CatWeld cwm);

	/**
	 * 删除焊缝
	 * @param wj
	 */
	boolean deleteCatweld(BigInteger id);
	
	/**
	 * 焊工对应的焊机焊缝信息
	 * @param page 分页
	 * @param dto 
	 * @param str
	 * @param welderid 焊机编号
	 * @return
	 */
	List<WeldedJunction> getJMByWelder(Page page, WeldDto dto,String welderid);
	
	/**
	 * 时间段内焊接开始时间
	 */
	String getFirsttime(WeldDto dto, BigInteger machineid, String welderid,String junid);
	
	/**
	 * 时间段内焊接结束时间
	 */
	String getLasttime(WeldDto dto, BigInteger machineid, String welderid,String junid);
}