package com.pelopiti.test.sandbox.rest;

import javax.inject.Inject;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.pelopiti.test.sandbox.logger.rest.CustomerEndpoint;

@RunWith(Arquillian.class)
public class CustomerEndpointTest
{
   @Inject
   private CustomerEndpoint customerendpoint;

   @Deployment
   public static JavaArchive createDeployment()
   {
      return ShrinkWrap.create(JavaArchive.class, "test.jar")
            .addClass(CustomerEndpoint.class)
            .addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
   }

   @Test
   public void testIsDeployed()
   {
      Assert.assertNotNull(customerendpoint);
   }
}
