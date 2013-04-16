package com.pelopiti.test.sandbox.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Version;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import org.codehaus.jackson.annotate.JsonManagedReference;



@XmlRootElement
@Entity
public class Customer implements Serializable
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5647726859488534174L;
	@Id
	private @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	Long id = null;
	@Version
	private @Column(name = "version")
	int version = 0;

	@Column
	private String firstName;

	@Column
	private String lastName;

	@JsonManagedReference
	@OneToMany(cascade=CascadeType.ALL, mappedBy="customer")
	private Set<Order> orders;

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


	@JsonManagedReference
	public Set<Order> getOrders() {
		return orders;
	}


	public void setOrders(Set<Order> orders) {
		this.orders = orders;
	}


	public void setVersion(final int version)
	{
		this.version = version;
	}


	public String getFirstName()
	{
		return this.firstName;
	}

	public void setFirstName(final String firstName)
	{
		this.firstName = firstName;
	}

	public String getLastName()
	{
		return this.lastName;
	}

	public void setLastName(final String lastName)
	{
		this.lastName = lastName;
	}

	public String toString()
	{
		String result = "";
		if (firstName != null && !firstName.trim().isEmpty())
			result += firstName;
		if (lastName != null && !lastName.trim().isEmpty())
			result += " " + lastName;
		return result;
	}


	
	
	
}