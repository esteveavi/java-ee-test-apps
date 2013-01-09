package cat.tmb.test.logger.services.monitor;

import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;
import javax.ejb.Startup;
import javax.ejb.Singleton;

import com.yammer.metrics.HealthChecks;
import com.yammer.metrics.Metrics;
import com.yammer.metrics.core.Counter;
import com.yammer.metrics.core.Gauge;
import com.yammer.metrics.core.Histogram;
import com.yammer.metrics.core.Meter;
import com.yammer.metrics.core.Timer;
import com.yammer.metrics.core.TimerContext;
import com.yammer.metrics.reporting.ConsoleReporter;

@Singleton
@Startup
public class MonitorService {

	public MonitorService(){

		//System.out.print("MonitorService startup");
		//ConsoleReporter.enable(1, TimeUnit.MINUTES);
	}

	private final Counter pendingJobs = Metrics.newCounter(MonitorService.class, "test-counter");
	private final Meter requests = Metrics.newMeter(MonitorService.class, "requests", "requests", TimeUnit.HOURS);
	private final Histogram responseSizes = Metrics.newHistogram(MonitorService.class, "response-sizes");
	private final Timer responses = Metrics.newTimer(MonitorService.class, "responses", TimeUnit.MILLISECONDS, TimeUnit.SECONDS);

	


	@PostConstruct
	public void init() {
		System.out.println("MonitorService startup");
		Metrics.newGauge(MonitorService.class, "pending-jobs", new Gauge<Integer>() {
			@Override
			public Integer value() {
				return Thread.activeCount();
			}
		});

		pendingJobs.inc();
		requests.mark();
		responseSizes.update(12312);
		final TimerContext context = responses.time();
		try {
			// etc;

		} finally {
			context.stop();
		}
		
		HealthChecks.register(new DatabaseHealthCheck());
	}
}

