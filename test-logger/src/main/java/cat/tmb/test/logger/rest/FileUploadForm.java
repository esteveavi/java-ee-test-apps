package cat.tmb.test.logger.rest;

import javax.ws.rs.FormParam;



public class FileUploadForm {
	 
	public FileUploadForm() {
	}
 
	private byte[] data;
 
	public byte[] getData() {
		return data;
	}
/* 
	@FormParam("uploadedFile")
	@PartType("application/octet-stream")
	public void setData(byte[] data) {
		this.data = data;
	}
 */
}