package com.pelopiti.test.sandbox.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Version;
import javax.xml.bind.annotation.XmlTransient;

import org.codehaus.jackson.annotate.JsonBackReference;
import org.codehaus.jackson.annotate.JsonIgnore;


@Entity
@Table(name="ORDER_")
public class Order implements Serializable
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 2316022404522935576L;

	@Id
	@XmlTransient
	@JsonIgnore
	private @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	Long id = null;
	
	@Version
	@Column(name = "version")
	private int version = 0;

	@Column
	private String orderNumber;

	@JsonBackReference 
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="customer_id")
	private Customer customer;


	@XmlTransient
	public Long getId()
	{
		return this.id;
	}


	public void setId(final Long id)
	{
		this.id = id;
	}

	public int getVersion()
	{
		return this.version;
	}


	public void setVersion(final int version)
	{
		this.version = version;
	}


	public String getOrderNumber() {
		return orderNumber;
	}


	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}


	@JsonBackReference 
	public Customer getCustomer() {
		return customer;
	}


	public void setCustomer(Customer customer) {
		this.customer = customer;
	}


	

}