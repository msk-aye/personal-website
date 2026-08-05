import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";

// Pages
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Interests from "./pages/Interests";
import Education from "./pages/Education";
import Contact from "./pages/Contact";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import BlogEditor from "./pages/BlogEditor";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={About} />
        <Route path="/experience" component={Experience} />
        <Route path="/projects" component={Projects} />
        <Route path="/interests" component={Interests} />
        <Route path="/education" component={Education} />
        <Route path="/contact" component={Contact} />
        <Route path="/blog" component={BlogList} />
        <Route path="/blog/new" component={BlogEditor} />
        <Route path="/blog/:slug/edit" component={BlogEditor} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="bottom-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
