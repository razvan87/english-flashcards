export function renderGuestCarousel() {
    const container = document.getElementById("cards-container");
    const pagination = document.getElementById("pagination");
  
    if (!container) return;
  
    container.innerHTML = `
    <div class="col-12 p-0">
  
      <div id="guestCarousel" class="carousel slide hero-carousel" data-bs-ride="carousel" data-bs-interval="5000">
  
        <div class="carousel-inner">
  
          <!-- Slide 1 -->
          <div class="carousel-item active">
            <div class="hero-slide bg-primary text-white">
              <div class="hero-content text-center">
                <h1 class="display-3 fw-bold">📚 Learn English with Flashcards</h1>
                <p class="lead mt-3">Interactive vocabulary learning with images and examples.</p>
  
                <button class="btn btn-light btn-lg mt-4"
                        data-bs-toggle="modal"
                        data-bs-target="#registerModal">
                  Start Learning
                </button>
              </div>
            </div>
          </div>
  
          <!-- Slide 2 -->
          <div class="carousel-item">
            <div class="hero-slide bg-success text-white">
              <div class="hero-content text-center">
                <h1 class="display-3 fw-bold">🚀 Improve Your Vocabulary</h1>
                <p class="lead mt-3">Thousands of flashcards organized by levels and categories.</p>
  
                <button class="btn btn-light btn-lg mt-4"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal">
                  Login
                </button>
              </div>
            </div>
          </div>
  
          <!-- Slide 3 -->
          <div class="carousel-item">
            <div class="hero-slide bg-dark text-white">
              <div class="hero-content text-center">
                <h1 class="display-3 fw-bold">🧠 Smart Learning</h1>
                <p class="lead mt-3">Definitions, examples and images help you remember faster.</p>
  
                <button class="btn btn-outline-light btn-lg mt-4"
                        data-bs-toggle="modal"
                        data-bs-target="#registerModal">
                  Create Free Account
                </button>
              </div>
            </div>
          </div>
  
        </div>
  
        <!-- Controls -->
        <button class="carousel-control-prev" type="button" data-bs-target="#guestCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
  
        <button class="carousel-control-next" type="button" data-bs-target="#guestCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
  
        <!-- Indicators -->
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#guestCarousel" data-bs-slide-to="0" class="active"></button>
          <button type="button" data-bs-target="#guestCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#guestCarousel" data-bs-slide-to="2"></button>
        </div>
  
      </div>
  
    </div>
    `;
  
    if (pagination) pagination.innerHTML = "";
  }