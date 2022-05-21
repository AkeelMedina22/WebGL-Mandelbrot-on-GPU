function map_point(p, q, a, b, x)
{
    // If we are mapping from a number range to a number range: 

    if(typeof(p)=='number'&&typeof(a)=='number') 
    {
    return (a + (parseFloat(b - a) / parseFloat((q - p)) * (x - p)))
    }

    // If we are mapping from a vector range to a vector range:

    var vector = subtract(q, p);
    var alphavect = subtract(p, x);
    var alpha = length(alphavect)/length(vector);

    return mix(a, b, alpha);
}