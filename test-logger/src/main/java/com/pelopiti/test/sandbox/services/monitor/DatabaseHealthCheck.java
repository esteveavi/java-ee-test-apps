package com.pelopiti.test.sandbox.services.monitor;

import com.yammer.metrics.core.HealthCheck;

public class DatabaseHealthCheck extends HealthCheck {
    

    public DatabaseHealthCheck() {
        super("database");
    }

    @Override
    public Result check() throws Exception {
        if (true) {
            return Result.healthy();
        } else {
            return Result.unhealthy("Cannot connect to " + "DATABASE");
        }
    }
}