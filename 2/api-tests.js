// Test suite for Fake Store API
const API_URL = 'https://fakestoreapi.com/products';

// Function to fetch products from the API
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        return {
            status: response.status,
            data: await response.json()
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
}

// Function to validate product data
function validateProduct(product) {
    const defects = [];

    // Check if title is empty
    if (!product.title || product.title.trim() === '') {
        defects.push('Empty title');
    }

    // Check if price is negative
    if (product.price < 0) {
        defects.push('Negative price');
    }

    // Check if rating rate exceeds 5
    if (product.rating?.rate > 5) {
        defects.push('Rating rate exceeds 5');
    }

    return defects;
}

// Main test function
async function runTests() {
    console.log('Starting API tests...\n');

    // Test 1: Check server response
    const result = await fetchProducts();
    if (!result) {
        console.error('Failed to fetch products');
        return;
    }

    console.log('Test 1: Server Response');
    console.log(`Status Code: ${result.status}`);
    console.log(`Expected: 200, Actual: ${result.status}`);
    console.log(`Test ${result.status === 200 ? 'PASSED' : 'FAILED'}\n`);

    // Test 2: Validate product data
    console.log('Test 2: Product Data Validation');
    const productsWithDefects = [];

    result.data.forEach(product => {
        const defects = validateProduct(product);
        if (defects.length > 0) {
            productsWithDefects.push({
                id: product.id,
                title: product.title,
                defects: defects
            });
        }
    });

    console.log(`Found ${productsWithDefects.length} products with defects:`);
    productsWithDefects.forEach(product => {
        console.log(`\nProduct ID: ${product.id}`);
        console.log(`Title: ${product.title}`);
        console.log('Defects:');
        product.defects.forEach(defect => console.log(`- ${defect}`));
    });
}

// Run the tests
runTests(); 