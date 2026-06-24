'use strict'
 
exports.config = {
  app_name: ['capstone-api'],
  license_key: '2ce8259bcbddab262d08a865e9d64cfa4edcNRAL',
  logging: {
    level: 'info'
  },
  allow_all_headers: true,
  distributed_tracing: {
    enabled: true  // This enables trace_id generation!
  }
}