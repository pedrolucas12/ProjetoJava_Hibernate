package com.hepta.funcionarios.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.hepta.funcionarios.entity.Setor;
import com.hepta.funcionarios.persistence.SetorDAO;

@Path("/setor")
public class SetorService {

    private SetorDAO setorDao;
    
    public SetorService() {
    	setorDao = new SetorDAO();
    }

    @Path("/listar")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response setorGetAll() {
        List<Setor> setorList = new ArrayList<>();
        try {
        	setorList = setorDao.getAll();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao buscar Setores").build();
        }

        GenericEntity<List<Setor>> entity = new GenericEntity<List<Setor>>(setorList) {
        };
        return Response.status(Status.OK).entity(entity).build();
    }

}
