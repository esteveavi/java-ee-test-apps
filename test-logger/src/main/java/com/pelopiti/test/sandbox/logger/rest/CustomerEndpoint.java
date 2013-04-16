package com.pelopiti.test.sandbox.logger.rest;

import java.util.List;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.pelopiti.test.sandbox.model.Customer;
import com.pelopiti.test.sandbox.services.payment.PayPalPaymentProcessor;
import com.pelopiti.test.sandbox.services.payment.PaymentProcessor;


/**
 * @author <a href="mailto:lincolnbaxter@gmail.com">Lincoln Baxter, III</a>
 * 
 *         JAX-RS Example This class produces a RESTful service to read the contents of the table.
 */
@Stateless
@Path("/customer")
@TransactionAttribute
public class CustomerEndpoint 
{
	@PersistenceContext
	private EntityManager em;

	 @Inject
	@PayPalPaymentProcessor
	private PaymentProcessor paymentProcessor;
	
	@POST
	@Consumes("application/xml")
	public Customer create(Customer entity)
	{
		em.joinTransaction();
		em.persist(entity);
		return entity;
	}

	@DELETE
	@Path("/{id:[0-9][0-9]*}")
	@Produces("application/xml")
	public Customer deleteById(@PathParam("id")
	Long id)
	{
		em.joinTransaction();
		Customer result = em.find(Customer.class, id);
		em.remove(result);
		return result;
	}

	@GET
	@Path("/{id:[0-9][0-9]*}")
	@Produces("application/json")
	public Customer findById(@PathParam("id")
	Long id)
	{
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Customer> cq = cb.createQuery(Customer.class);
		Root<Customer> root = cq.from(Customer.class);
		
		Join<Object, Object> orders = (Join<Object, Object>) root.fetch( "orders" );
		//Join<Customer, Order> p = (Join<Customer, Order>)root.fetch("orders");
		javax.persistence.criteria.Path<Object> path = orders.get("id");
		
		cq.where(cb.and( cb.equal(root.get("id"),1 ), cb.equal(path,2 )));
		
		TypedQuery<Customer> q = em.createQuery(cq);
		
		return q.getSingleResult();
	}

	@GET
	@Path("/checkout")
	@Produces("application/json")
	public Response checkout()
	{
		paymentProcessor.checkoutPayment();
		return Response.status(200).build();
	}
	
	@GET
	@Produces("application/json")
	public List<Customer> listAll()
	{
		@SuppressWarnings("unchecked")
		final List<Customer> results = em.createQuery("SELECT x FROM Customer x").getResultList();
		return results;
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/xml")
	public Customer update(@PathParam("id")
	Long id, Customer entity)
	{
		entity.setId(id);
		em.joinTransaction();
		entity = em.merge(entity);
		return entity;
	}


	@POST
	@Path("/handleUploads")
	@Consumes("application/json")
	public void handleUploads()
	{

	}


	/*

	@POST
	@Path("/upload/process")
	@Consumes("multipart/form-data")
	public Response uploadFile(@MultipartForm FileUploadForm form) {

		String fileName = "d:\\anything";

		try {
			writeFile(form.getData(), fileName);
		} catch (IOException e) {

			e.printStackTrace();
		}

		System.out.println("Done");

		return Response.status(200)
		    .entity("uploadFile is called, Uploaded file name : " + fileName).build();

	}

	// save to somewhere
	private void writeFile(byte[] content, String filename) throws IOException {

		File file = new File(filename);

		if (!file.exists()) {
			file.createNewFile();
		}

		FileOutputStream fop = new FileOutputStream(file);

		fop.write(content);
		fop.flush();
		fop.close();

	}


	 */

}