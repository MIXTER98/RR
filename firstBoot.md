## Spring Boot-[DIARIO GUÍA]

### Concepto

Spring Boot es un **framework basado en Java** que simplifica la creación de aplicaciones.
Elimina configuraciones manuales extensas y permite ejecutar proyectos como un `.jar` con servidor embebido (Tomcat por defecto).
Se usa mucho para **APIs REST**, microservicios y aplicaciones empresariales.

---

## Configuración inicial

Archivo `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mi_base
spring.datasource.username=root
spring.datasource.password=1234
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true 
```

### Explicación

Este archivo define como la aplicación se conecta con la base de datos:

- `spring.datasource.url`: direccion de la base de datos.
- `spring.datasource.username y password`: credenciales de acceso.
- `spring.jpa.hibernate.ddl-auto=update`: crea/actualiza tablas automaáticamente segun tus entidades.
- `spring.jpa.show-sql=true`: muestra las consultas SQL en consola para depuración.

### Casos de uso

- Cuando necesitas conectar tu aplicación a una base de datos (ej. MySQL, PostgreSQL).
- Ideal para proyectos pequeños y medianos donde no quieres configurar Hibernate manualmente.
- Útil en desarrollo porque te permite ver las consultas SQL generadas.

---

## Entidades (`@Entity`)

### Concepto

Una entidad representa una tabla en la base de datos.  
Cada atributo de la clase corresponde a una columna.

### Fragmento de código

```java
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;
    private String nombreUsuario;
}
```

### Explicación

- `@Entity`: convierte la clase en una tabla en la BD.
- `@Id`: define la clave primaria.
- `@GeneratedValue`: autoincrementa el ID.
- Los atributos (nombreUsuario) se convierten en columnas.

### Casos de uso

- Cuando necesitas mapear una tabla de la base de datos a una clase Java.
- Se usa en aplicaciones que requieren persistencia de datos (ej. usuarios, productos, pedidos).
- Permite trabajar con objetos en lugar de escribir SQL manual.

---

## Repositorios (`JpaRepository`)

```java
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByNombreUsuario(String nombreUsuario);
} 
```

### Explicación:

- `JpaRepository<Usuario, Long>`: habilita métodos CRUD (crear, leer, actualizar, eliminar) para la entidad `Usuario`.
- `findByNombreUsuario`: Spring genera automáticamente la consulta  SQL para buscar por nombre.
- `Optional`: evita errores si no se encuentra registro.

### Casos de uso:

- Cuando necesitas acceder a la base de datos sin escribir SQL manual.
- Ideal para proyectos donde se requiere  CRUD rápido.
- Se coloca en el paquete `repository` y se inyecta en servicios o controladores.

---

## Controladores (`@RestController`)

```java
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // 🔹 READ: obtener todos
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // 🔹 READ: obtener por ID
    @GetMapping("/{id}")
    public Usuario obtenerUsuario(@PathVariable Long id) {
        return usuarioRepository.findById(id).orElseThrow();
    }

    // 🔹 CREATE: guardar nuevo
    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // 🔹 UPDATE: actualizar existente
    @PutMapping("/{id}")
    public Usuario actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setIdUsuario(id);
        return usuarioRepository.save(usuario);
    }

    // 🔹 DELETE: eliminar por ID
    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
    }
}
```

### Explicación:

- `@RestController`: convierte la clase en un controlador REST.
- `@RequestMapping("/api/usuarios")`: define la ruta de base para los endpoints.
- `@GetMapping("/{id}")`: expone un endpoint para obtener un usuario por ID.
- `@GetMapping`: expone endpoints para leer datos (todos o por ID).
- `@PostMapping`: permite crear nuevos regitros.
- `@PutMapping`: sirve para actualizar registros existentes.
- `@DeleteMapping`: elimina registros por ID.
- `@RequestBody`: indica que los datos vienen en el cuerpo de la petición.
- `@PathVariable`: extrae valores de la URL (ej. `/api/usuarios/1`).
  
### Casos de uso:

- Cuando necesitas exponer datos a traves de endpoints HTTP.
- Se usa en APIs REST para que clientes (ej. Angular, Postman) consuman información.
- Ideal para proyectos CRUD donde se necesita exponer operaciones básicas de la BD.
- Se coloca en el paquete `controller` y se conecta con los repositorios.

---

## Servicios (`@Service`)

```java
@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // 🔹 READ: obtener todos
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // 🔹 READ: obtener por ID
    public Usuario obtenerUsuario(Long id) {
        return usuarioRepository.findById(id).orElseThrow();
    }

    // 🔹 CREATE: guardar nuevo
    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // 🔹 UPDATE: actualizar existente
    public Usuario actualizarUsuario(Long id, Usuario usuario) {
        usuario.setIdUsuario(id);
        return usuarioRepository.save(usuario);
    }

    // 🔹 DELETE: eliminar por ID
    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
}
```

### Eplicación:

- `@Service`: marca la clase como un servicio de negocio.
- Aquí se centraliza la lógica antes de llamar al repositorio.
- Permite separar responsabilidades: el controlador solo expone endpoints, el servicio maneja reglas y validaciones.

**Casos de uso:**

- Cuando necesitas aplicar reglas de negocio (ej. validar datos antes de guardar).
- Útil para mantener el código ordenado y evitar lógica en los controladores.
- Se coloca en el paquete `service` y se inyecta en los controladores.

---

## DTOs (Data Transfer Objects)

```java
public class UsuarioDTO {
    private String nombreUsuario;
    private String apellidoPaterno;

    // Getters y Setters
}
```

**Explicación:**

- Un **DTO** es un objeto que se usa para **transferir datos** entre capas (controlador <> servicio <> cliente).
- Permite **no exponer directamente la entidad** (ej. `Usuario`) y enviar solo lo necesario.
- Se usa mucho en APIs REST para controlar que datos se devuelven o reciben.
**Casos de uso**

- Cuando quieres ocultar campos sensibles(ej. contraseñas).
- Para simplificar la respuesta de la API (ej. devolver solo nombre y apellido).
- Útil en proyectos grandes donde las entidades tienen muchos atributos.

---

## Seguridad (Spring Security)

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // desactiva CSRF para pruebas
            .authorizeRequests()
            .antMatchers("/api/usuarios/**").authenticated()
            .anyRequest().permitAll()
            .and()
            .httpBasic(); // autenticación básica
    }
}
```

### Explicación

- `@EnableWebSecurity`: activa la seguridad en la aplicación.
- `authorizeRequests`: define qué rutas requieren autenticación.
- `httpBasic()`: habilita autenticación básica (usuario/contraseña en el header).
- `csrf().disable()`: se desactiva en pruebas, pero en producción se recomienda mantenerlo.
- `.antMatchers("/api/usuarios/**").authenticated()`:
  - Todas las rutas que empicen `/api/usuarios/` rquieren que el usuario esté autenticado.
  - Ejemplo: `/api/usuarios/1` o `/api/usuarios/listar`.
- `.anyRequest().permitAll()`:
  - Cualquier otra ruta que no sea `/api/usuarios/**` se permite sin autenticación.
  - Ejemplo: `/api/publico/info` estaría abierto.
  
### Casos de uso

- Cuando necesitas proteger endpoints de tu API.  
- Idela para proyectos donde solo usuarios autenticados pueden acceder a ciertos recursos.
- Se usa en combinación con un sistema con un sistema de usuarios y roles (ej. ADMIN, USER).
  
### Errores comunes

- Olvidar cerrar con `.and()` : rompe la cadena de configuración.
- Usar permitAll() en endpoints sensibles: deja la API insegura.
- Desactivar CSRF en producción: puede abrir vulnerabilidades.
  
---

## Validaciones (`@Valid`, `@NotNull`, `@Size`)

```java
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    @NotNull
    @Size(min = 3, max = 50)
    private String nombreUsuario;

    @NotNull
    private String apellidoPaterno;
}
```

### Explicación

- `@Valid, @NotNull, @NotBlank,@Size, @Email, @Min, @Max, @Pattern.`
- `@NotNull`: asegura que el campo no sea nulo.
- `@Size(min, max)`: valida la longitud mínima y máxima de un texto.
- Estas noraciones se procesan automáticamente cuando usas `@Valid` en el controlador.
  - Ejemplo del controlador:
  
    ```java
    @PostMapping
    public Usuario crearUsuario(@Valid @RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    ```

### Casos de uso

- Cuando necesitas validar datos antes de guardarlos en la BD.
- Evita registros incompletos o inválidos.
- Útil en formularios y APIs REST para asegurar calidad de datos.

### Errores comunes

- Olvidar `@Valid` en el controlador: las validaciones no se aplican.
- No dar mensajes personalizados: el cliente recibe errores genéricos.

---

## Manejo de excepciones globales (`@ControllerAdvice`)

```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationErrors(MethodArgumentNotValidException ex) {
        return ResponseEntity.badRequest().body("Error de validación: " + ex.getMessage());
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNotFound(NoSuchElementException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recurso no encontrado");
    }
}
```

### Explicación

- `@ControllerAdvice`: define una clase que maneja excepciones de forma global.
- `@ExceptionHandler`: captura un tipo específico de error y devuelve una respuesta personalizada.
- `MethodArgumentNotValidException`: ocurre cuando fallan las validaciones (`@Valid`).
- `NoSuchElementException`: Ocurre cuando no se encuentra registro en la BD.

### Casos de uso

- Cuando quieres devolver mensajes claros al cliente en lugar de errores genéricos.
- Útil para APIs REST que deben manejar errores de forma uniforme.
- Mejora la experiencia del cliente y facilita depuración.

### Errores comunes

- No capturar excepciones: El cliente recibe un error 500 sin explicación.
- Manejar exepciones solo en el controlador: Código repetitivo y dificil de mantener.

## Documentación de APIS con Swagger / OpenAPI

*Depencia Maven*

```XML
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.8.13</version>
</dependency>
```

**Controlador documentado***

```java
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Operation(summary = "Obtener usuario por ID")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Usuario encontrado"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Usuario no encontrado"
        )
    })
    @GetMapping("/{id}")
    public UsuarioResponseDTO obtenerUsuario(
            @PathVariable Long id) {

        return service.obtenerUsuario(id);
    }
}
```

Acceso a Swagger UI:

1. `http://localhost:8080/swagger-ui.html`.
2. `http://localhost:8080/swagger-ui/index.html`.

### Explicación

**Swagger** es una herramienta que genera documentación interactiva para APIs REST.
Permite:

- Ver enpoints.
- Probar peticiones.
- Ver parámetros.
- Visualizar respuestas.
- Compartir documentación.

**¿Qué es OpenAPI?**
OpenAPI es la especificación estándar. Swagger UI es una implementación visual de OpenAPI.

- `@Operation`: Describe el propósito de un endpoint.
- `@ApiResponse`: Documenta respuestas HTTP.
- `@Parameter`: Documenta parámetros:
    ```java
    @GetMapping("/{id}")
    public Usuario obtener(
    @Parameter(
        description = "ID del usuario"
    )
    @PathVariable Long id) {

    return service.buscar(id);
    }
    ```

### Casos de uso

- Probar endpoints sin Postman: Swagger permite enviar solicitudes directamente dede el navegador.
- Compartir la API con frontend: Un desarrollador Angular o React puede revisar: URL, método HTTP, request Body y response Body; sin leer código Java.
- Documentar microservicios: Cada microservicio posee su propia documentación.
- Capacitación de nuevos desarrolladores: Un nuevo integrante puede conocer rápidamente: Endpoint, parámetros, respuestas y errores.

### Errores comunes

- No documentar los endpoints.
- No ducumentar los códigos de respuesta.
- Descripciones ambiguas.
- No documentar parámetros.
- Creer que swagger reemplaza las pruebas.


## Configuración Web en Spring Boot (WebMvcConfigurer)

Personaliza el comportamiento del modulo web de Spring mediante la interfaz:

```java
public class WebConfig implements WebMvcConfigurer
```

Dentro de esa configuración hay dos subtemas importantes:

1. **Configuración CORS (Cross-Origin Resourse Sharing)**

```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
            .allowedOrigins("https://localhost:4200")
            .allowedMethods("GET", "POST", "PUT", "DELETE");
}
```

**¿Para qué sirve**
Permite que una aplicación foronted (Angular, React, Vue) pueda consumir la API sin que el navegador bloquee la petición.
Por ejmplo:
Angular
`https://localhost:4200`

Spring Boot
`http://localhost:8080`

Como son origenes distintos, el navegador bloqueará la comunicación si no se configura CORS.

2. **Gestion de archivos estáticos**

```java
@Override
public void addResourceHandlers(
        ResourceHandlerRegistry registry) {

    registry.addResourceHandler("/uploads/**")
            .addResourceLocations(
                "file:C:/xampp/htdocs/uploads/");
}
```
**¿Qué hace?**
Permite que un archivo almacenado en:
`C:/xampp/htdocs/uploads/foto.jpg`
sea accesible desde:
`http://localhost:8080/uploads/foto.jpg`
Spring actúa como intermediario para exponer esos archivos.