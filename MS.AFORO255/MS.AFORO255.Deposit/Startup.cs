using Aforo255.Cross.Discovery.Consul;
using Aforo255.Cross.Discovery.Mvc;
using Aforo255.Cross.Event.Src;
using Aforo255.Cross.Http.Src;
using Aforo255.Cross.Tracing.Src;
using Consul;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MS.AFORO255.Deposit.Messages.CommandHandlers;
using MS.AFORO255.Deposit.Messages.Commands;
using MS.AFORO255.Deposit.Repositories;
using MS.AFORO255.Deposit.Services;
using System.Reflection;

namespace MS.AFORO255.Deposit
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new OpenApiInfo { Title = "MS.AFORO255.Deposit", Version = "v1" });
            //});

            services.AddDbContext<ContextDatabase>(
              options =>
              {
                  //options.UseNpgsql(Configuration["postgres:cn"]);
                  options.UseNpgsql(Configuration["cnpostgres"]);

              });
            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<IAccountService, AccountService>();

            /*Start RabbitMQ*/
            services.AddMediatR(typeof(Startup).GetTypeInfo().Assembly);
            services.AddRabbitMQ();
            services.AddTransient<IRequestHandler<TransactionCreateCommand, bool>, TransactionCommandHandler>();
            services.AddTransient<IRequestHandler<NotificationCreateCommand, bool>, NotificationCommandHandler>();
            /*End RabbitMQ*/

            services.AddProxyHttp();

            /*Start - Consul*/
            services.AddSingleton<IServiceId, ServiceId>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddConsul();
            /*End - Consul*/

            /*Start - Tracer distributed*/
            services.AddJaeger();
            services.AddOpenTracing();
            /*End - Tracer distributed*/
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env,
            IHostApplicationLifetime applicationLifetime, IConsulClient consulClient)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseSwagger();
                //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MS.AFORO255.Deposit v1"));
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            var serviceId = app.UseConsul();
            applicationLifetime.ApplicationStopped.Register(() =>
            {
                consulClient.Agent.ServiceDeregister(serviceId);
            });
        }
    }
}
